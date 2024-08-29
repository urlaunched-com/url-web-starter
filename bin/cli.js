const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const {execSync} = require('child_process');

const questions = [
    {
        type: 'list',
        name: 'projectType',
        message: 'What type of project is this?',
        choices: ['Landing', 'Application'],
        default: 'Landing'
    },
    {
        type: 'input',
        name: 'projectName',
        message: 'What is the name of your project?',
        validate: function (input) {
            if (input) return true;
            return 'Project name cannot be empty';
        }
    },
    {
        type: 'checkbox',
        name: 'applicationFeatures',
        message: 'Select the features needed for the application:',
        choices: [
            {name: 'Schema org', value: 'needsSchema'},
            {name: 'Tests', value: 'needsTests'},
            {name: 'Email templates', value: 'needsEmailTemplates'}
        ],
        when: (answers) => answers.projectType === 'Application'
    },
    {
        type: 'confirm',
        name: 'needsSchema',
        message: 'Do you want to add Schema.org to your project?:',
        when: (answers) => answers.projectType === 'Landing',
        default: false
    },
    {
        type: 'input',
        name: 'figmaFileId',
        message: 'Please enter your figma file id',
        validate: function (input) {
            if (input) return true;
            return 'Figma field cannot be empty';
        }
    },
    {
        type: 'input',
        name: 'figmaPersonalToken',
        message: 'Please enter your figma personal token',
        validate: function (input) {
            if (input) return true;
            return 'Figma personal token cannot be empty';
        }
    },
];

inquirer.prompt(questions).then((answers) => {
    const {projectType, projectName, figmaFileId, figmaPersonalToken, applicationFeatures = [], needsSchema} = answers;
    const needsTests = applicationFeatures.includes('needsTests');
    const needsEmailTemplates = applicationFeatures.includes('needsEmailTemplates');
    const needsAppSchema = applicationFeatures.includes('needsSchema');
    const templatePath = path.join(__dirname, '..', 'templates', 'general');
    const projectPath = projectName === '.' ? process.cwd() : path.join(process.cwd(), projectName);

    if (!fs.existsSync(templatePath)) {
        console.error(`Template for ${projectType} not found.`);
        process.exit(1);
    }

    // Update figma-export.yaml with figmaFileId before copying
    const figmaConfigPath = path.join(templatePath, 'figma-export.yaml');
    if (fs.existsSync(figmaConfigPath)) {
        let figmaConfig = fs.readFileSync(figmaConfigPath, 'utf8');
        figmaConfig = figmaConfig.replace(/fieldId: .*/, `fieldId: ${figmaFileId}`);
        fs.writeFileSync(figmaConfigPath, figmaConfig, 'utf8');
    } else {
        console.error(`figma-export.yaml not found in template path: ${templatePath}`);
        process.exit(1);
    }

    fs.mkdirSync(projectPath);
    copyTemplateFiles(templatePath, projectPath);
    console.log(`Project ${projectName} created successfully.`);

    // Copy specific files for project type
    const specificTemplatePath = path.join(__dirname, '..', 'templates', projectType.toLowerCase().replace(' ', ''));
    if (fs.existsSync(specificTemplatePath)) {
        copyTemplateFiles(specificTemplatePath, projectPath);
    } else {
        console.error(`Specific template for ${projectType} not found.`);
        process.exit(1);
    }

    // If needsTests is selected, copy files from the tests directory
    if (needsTests) {
        const testsPath = path.join(__dirname, '..', 'templates', 'tests');
        copyTemplateFiles(testsPath, projectPath);
    }

    // If needsSchema is selected, copy files from the schema directory
    if (needsSchema || needsAppSchema) {
        const schemaPath = path.join(__dirname, '..', 'templates', 'schema');
        copyTemplateFiles(schemaPath, projectPath, true);

        // Run yarn add schema-dts in the project directory
        try {
            execSync('yarn add schema-dts', {cwd: projectPath, stdio: 'inherit'});
        } catch (error) {
            console.error('Error running yarn add schema-dts:', error);
            process.exit(1);
        }
    }

    // Run yarn in the project directory
    execSync('yarn', {cwd: projectPath, stdio: 'inherit'});

    // Ensure figma-export is installed globally
    try {
        execSync('yarn global add figma-export-js', {stdio: 'inherit'});
    } catch (error) {
        console.error('Error installing figma-export-js:', error);
        process.exit(1);
    }

    // Set FIGMA_PERSONAL_TOKEN environment variable
    process.env.FIGMA_PERSONAL_TOKEN = figmaPersonalToken;

    // Execute figma-export command with correct working directory
    try {
        execSync('figma-export', {cwd: projectPath, stdio: 'inherit'});
    } catch (error) {
        console.error('Error executing figma-export:', error);
        process.exit(1);
    }

    // If needsEmailTemplates is selected, run yarn create email in the project root
    if (needsEmailTemplates) {
        try {
            execSync('yarn create email', {cwd: projectPath, stdio: 'inherit'});
        } catch (error) {
            console.error('Error running yarn create email:', error);
            process.exit(1);
        }
    }
});

function copyTemplateFiles(templatePath, projectPath, append = false) {
    const filesToCreate = fs.readdirSync(templatePath);

    filesToCreate.forEach(file => {
        const origFilePath = path.join(templatePath, file);
        const stats = fs.statSync(origFilePath);

        if (stats.isFile()) {
            const contents = fs.readFileSync(origFilePath, 'utf8');
            const writePath = path.join(projectPath, file);
            if (append && file === 'index.ts' && fs.existsSync(writePath)) {
                fs.appendFileSync(writePath, contents, 'utf8');
            } else {
                fs.writeFileSync(writePath, contents, 'utf8');
            }
        } else if (stats.isDirectory()) {
            fs.mkdirSync(path.join(projectPath, file), {recursive: true});
            copyTemplateFiles(path.join(templatePath, file), path.join(projectPath, file), append);
        }
    });
}