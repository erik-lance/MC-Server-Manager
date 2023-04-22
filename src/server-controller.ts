//import { spawn } from 'child_process';
import pm2, { ProcessDescription, Proc } from 'pm2';

async function startServer(): Promise<void> {
    return new Promise((resolve, reject) => {
        pm2.start(
        {
            name: 'minecraft-server',
            script: 'java',
            args: ['-Xmx2G', '-Xms2G', '-jar', '../../minecraft_server/server.jar', 'nogui'],
            cwd: './server',
        },
        function (err: Error, apps: ProcessDescription) {
            if (err) {
                reject(err);
                return;
            }

            if (apps !== undefined && apps.pm_id !== undefined) {
                console.log(`Stopped Minecraft server with pm2: ${apps.pm_id}`);
            }
            else  {
                reject(new Error("No apps found"));
                return;
            }
            resolve();
        }
        );
    });
}  

function stopServer(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        // Stop the server with pm2
        pm2.stop('minecraft-server', function(err: Error | null, apps: Proc) {
            if (err) {
                reject(err);
                return;
            }

            if (apps !== undefined && apps.pm_id !== undefined) {
                console.log(`Stopped Minecraft server with pm2: ${apps.pm_id}`);
            }
            else  {
                reject(new Error("No apps found"));
                return;
            }
            resolve();
        });
    });
}



export async function isServerRunning(): Promise<boolean> {
    return new Promise((resolve, reject) => {
        // Get list of running pm2 processes
        pm2.list((err: Error, processes: ProcessDescription[]) => {
            if (err) {
                reject(err);
                return;
            }
            // Check if Minecraft server process is running
            const isRunning = processes.some((p) => {
                const server_env = p.pm2_env;
                const name_check:boolean = p.name === 'minecraft-server';
                
                if (server_env !== undefined && server_env.status !== undefined)
                {
                    const status_check:boolean = server_env.status === 'online';
                    return name_check && status_check;
                }
            });
            resolve(isRunning);
        });
    });
}
