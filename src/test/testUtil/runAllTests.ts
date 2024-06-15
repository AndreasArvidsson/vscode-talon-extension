import { globSync } from "glob";
import Mocha from "mocha";
import path from "node:path";

export function run(): Promise<void> {
    const mocha = new Mocha({
        ui: "tdd",
        color: true
    });

    const cwd = path.resolve(__dirname, "..");

    console.log("CWD: ", cwd);

    const files = globSync("**/**.test.js", { cwd }).sort();

    files.forEach((f) => mocha.addFile(path.resolve(cwd, f)));

    return new Promise((resolve, reject) => {
        try {
            // Run the mocha test
            mocha.run((failures) => {
                if (failures > 0) {
                    reject(new Error(`${failures} tests failed.`));
                } else {
                    resolve();
                }
            });
        } catch (err) {
            console.error(err);
            reject(err);
        }
    });
}
