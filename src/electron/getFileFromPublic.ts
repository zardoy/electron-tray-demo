import electronIsDev from "electron-is-dev";
import path from "path";
import pkgDir from "pkg-dir";

export const getFileFromPublic = (pathToFile: string): string => {
    if (electronIsDev) {
        const rootProjectDir = pkgDir.sync();
        if (!rootProjectDir) throw new Error("Unable to determine the root of project. Probably there is no package.json file");
        return path.resolve(rootProjectDir, "public", pathToFile);
    } else {
        return path.resolve(__dirname, "../build", pathToFile);
    }
};