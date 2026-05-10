import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

let serverProcess = null;
let restarting = false;
let debounceTimer = null;

function killProcess(proc) {
  return new Promise((resolve) => {
    if (!proc) { resolve(); return; }
    proc.on('exit', () => resolve());
    proc.kill('SIGTERM');
    setTimeout(() => {
      if (!proc.killed) proc.kill('SIGKILL');
      resolve();
    }, 3000);
  });
}

async function startServer() {
  return new Promise((resolve) => {
    console.log('🚀 تشغيل الباك إند...');
    const child = spawn('pnpm', ['--filter', '@workspace/api-server', 'dev'], {
      cwd: rootDir,
      stdio: 'inherit',
      shell: true,
    });
    serverProcess = child;
    child.on('exit', (code) => {
      serverProcess = null;
    });
    setTimeout(() => resolve(), 2000);
  });
}

async function restartBackend() {
  if (restarting) return;
  restarting = true;
  console.log('🔄 تغيير مكتشف! إعادة تشغيل الباك إند...');
  const oldProc = serverProcess;
  serverProcess = null;
  await killProcess(oldProc);
  await startServer();
  console.log('✅ الباك إند أُعيد تشغيله بنجاح!');
  restarting = false;
}

function onFileChange(eventType, filename) {
  if (!filename || !(filename.endsWith('.ts') || filename.endsWith('.js'))) return;
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => restartBackend(), 500);
}

const watchPaths = [
  path.join(rootDir, 'artifacts', 'api-server', 'src'),
];

watchPaths.forEach(watchPath => {
  if (fs.existsSync(watchPath)) {
    fs.watch(watchPath, { recursive: true }, onFileChange);
    console.log(`👀 مراقبة: ${watchPath}`);
  }
});

await startServer();
console.log('🎯 نظام المراقبة التلقائي نشط!');