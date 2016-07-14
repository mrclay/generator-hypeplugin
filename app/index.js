'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var mkdirp = require('mkdirp');

var ElggPluginModule = module.exports = function PhpGenerator(args, options, config) {
	yeoman.generators.Base.apply(this, arguments);
};

util.inherits(ElggPluginModule, yeoman.generators.Base);

ElggPluginModule.prototype.askFor = function askFor() {
	var cb = this.async();

	// have Yeoman greet the user.
	console.log(this.yeoman);

	console.log('--------------------------------');
	console.log('----------HYPEJUNCTION----------');
	console.log('--------------------------------')

	console.log("Let's scaffold your Elgg plugin");

	var prompts = [
		{
			name: 'pluginId',
			message: 'What is the ID of your plugin?',
			default: this.appname
		},
		{
			name: 'pluginName',
			message: 'What is the name of your plugin?'
		},
		{
			name: 'pluginDescription',
			message: 'Describe what your plugin does?'
		},
		{
			name: 'categories',
			message: 'Comma-separated list of categories',
			default: ''
		},
		{
			name: 'pluginAuthor',
			message: 'What is the name of the author?',
			default: 'Ismayil Khayredinov'
		},
		{
			name: 'pluginAuthorEmail',
			message: 'What the email address of the author?',
			default: 'info@hypejunction.com'
		},
		{
			name: 'website',
			message: 'What plugin project URL?',
			default: 'http://hypejunction.com/'
		},
		{
			name: 'githubUsername',
			message: "What is the author's Github username?",
			default: 'hypeJunction'
		},
		{
			name: 'requireElgg',
			message: 'What is the minimum required Elgg version?'
		}
	];

	this.prompt(prompts, function (props) {
		this.userOpts = {};
		this.systemOpts = {};

		this.userOpts.pluginId = props.pluginId;
		this.userOpts.composerId = props.pluginId.toLowerCase();
		this.userOpts.pluginName = props.pluginName;
		this.userOpts.pluginDescription = props.pluginDescription;
		this.userOpts.pluginAuthor = props.pluginAuthor;
		this.userOpts.pluginAuthorEmail = props.pluginAuthorEmail;
		this.userOpts.githubUsername = props.githubUsername;
		this.userOpts.composerNamespace = props.githubUsername.toLowerCase();
		var categories = props.categories.split(',');
		this.userOpts.categories = categories.map(function (s) {
			return {
				name: s.trim()
			};
		});
		this.userOpts.requireElgg = props.requireElgg;

		var d = new Date();
		this.systemOpts.year = d.getFullYear();

		cb();
	}.bind(this));
};


ElggPluginModule.prototype.plugin = function plugin() {
	var tplData = {
		userOpts: this.userOpts,
		systemOpts: this.systemOpts
	};

	mkdirp(this.destinationPath('actions'));
	mkdirp(this.destinationPath('classes'));
	mkdirp(this.destinationPath('languages'));
	this.fs.copyTpl(this.templatePath('languages/en.php'), this.destinationPath('languages/en.php'), tplData);
	mkdirp(this.destinationPath('screenshots'));
	mkdirp(this.destinationPath('sass'));
	mkdirp(this.destinationPath('views/default'));
	this.fs.copy(this.templatePath('.gitattributes'), this.destinationPath('.gitattributes'));
	this.fs.copy(this.templatePath('.gitignore'), this.destinationPath('.gitignore'));
	this.fs.copy(this.templatePath('CHANGELOG.md'), this.destinationPath('CHANGELOG.md'));
	this.fs.copy(this.templatePath('Gruntfile.js'), this.destinationPath('Gruntfile.js'));
	this.fs.copyTpl(this.templatePath('README.md'), this.destinationPath('README.md'), tplData);
	this.fs.copy(this.templatePath('autoloader.php'), this.destinationPath('autoloader.php'));
	this.fs.copyTpl(this.templatePath('composer.json'), this.destinationPath('composer.json'), tplData);
	this.fs.copy(this.templatePath('config.rb'), this.destinationPath('config.rb'));
	this.fs.copyTpl(this.templatePath('manifest.xml'), this.destinationPath('manifest.xml'), tplData);
	this.fs.copyTpl(this.templatePath('package.json'), this.destinationPath('package.json'), tplData);
	this.fs.copyTpl(this.templatePath('release.md'), this.destinationPath('release.md'), tplData);
	this.fs.copyTpl(this.templatePath('start.php'), this.destinationPath('start.php'), tplData);
};

