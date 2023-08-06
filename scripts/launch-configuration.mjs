import * as path from "node:path";
import * as fs from "node:fs";

let [nodePath, scriptPath, workspacePath, projectPath, projectName] = process.argv;
let moduleName = projectName.replace(/ /g, "").toLowerCase();

console.log(`Workspace path: ${workspacePath}`);
console.log(`Project path: ${projectPath}`);
console.log(`Project name: ${projectName}`);
console.log(`Module name: ${moduleName}`);

const projectRel = path.relative(workspacePath, projectPath).replace(/\\/g, "/");

let createLaunchConfig = env => `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<launchConfiguration type="org.eclipse.jdt.launching.localJavaApplication">
    <booleanAttribute key="org.eclipse.debug.core.ATTR_FORCE_SYSTEM_CONSOLE_ENCODING" value="false"/>
    <listAttribute key="org.eclipse.debug.core.MAPPED_RESOURCE_PATHS">
        <listEntry value="/${projectName}"/>
    </listAttribute>
    <listAttribute key="org.eclipse.debug.core.MAPPED_RESOURCE_TYPES">
        <listEntry value="4"/>
    </listAttribute>
    <booleanAttribute key="org.eclipse.jdt.launching.ATTR_ATTR_USE_ARGFILE" value="true"/>
    <booleanAttribute key="org.eclipse.jdt.launching.ATTR_SHOW_CODEDETAILS_IN_EXCEPTION_MESSAGES" value="true"/>
    <booleanAttribute key="org.eclipse.jdt.launching.ATTR_USE_CLASSPATH_ONLY_JAR" value="false"/>
    <booleanAttribute key="org.eclipse.jdt.launching.ATTR_USE_START_ON_FIRST_THREAD" value="true"/>
    <stringAttribute key="org.eclipse.jdt.launching.MAIN_TYPE" value="net.fabricmc.devlaunchinjector.Main"/>
    <stringAttribute key="org.eclipse.jdt.launching.MODULE_NAME" value="${moduleName}"/>
    <stringAttribute key="org.eclipse.jdt.launching.PROGRAM_ARGUMENTS" value="nogui"/>
    <stringAttribute key="org.eclipse.jdt.launching.PROJECT_ATTR" value="${projectName}"/>
    <stringAttribute key="org.eclipse.jdt.launching.VM_ARGUMENTS" value="-Dfabric.dli.config=\${workspace_loc:/${projectRel}/.gradle/loom-cache/launch.cfg} -Dfabric.dli.env=${env} -Dfabric.dli.main=net.fabricmc.loader.impl.launch.knot.Knot${env[0].toUpperCase()}${env.substring(1)}"/>
    <stringAttribute key="org.eclipse.jdt.launching.WORKING_DIRECTORY" value="\${workspace_loc:${projectRel}/run}"/>
</launchConfiguration>`;

let writeLaunchConfig = async env => {
    const outFile = path.resolve(projectPath, `${moduleName}_${env}.launch`);
    if (fs.existsSync(outFile)) {
        console.error(`${outFile} already existed!`);
        return;
    }
    
    await fs.promises.writeFile(outFile, createLaunchConfig(env), "utf-8");
    console.log(outFile);
};

Promise.all([
    writeLaunchConfig("client"),
    writeLaunchConfig("server")
]);
