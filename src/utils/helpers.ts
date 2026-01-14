export const isProduction = import.meta.env.MODE == "production";

let GIT_HASH: string | undefined
let GIT_DATE: string | undefined
export async function getWebsiteVersion() {
    if (GIT_HASH !== undefined && GIT_DATE !== undefined && isProduction) {
        return {hash: GIT_HASH, date: GIT_DATE}
    } else {
        const childProcess = await import("node:child_process");

        const hash = childProcess.execSync("git rev-parse --short HEAD").toString().trim();
        const date = childProcess.execSync("git log -1 --format=%cd --date=short").toString().trim();

        GIT_HASH = hash;
        GIT_DATE = date;

        return {hash, date}
    }
}