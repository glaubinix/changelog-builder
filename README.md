# Changelog Builder

Builds a commit based changelog by comparing the svn/git log of two branches.

[![Build Status](https://secure.travis-ci.org/glaubinix/changelog-builder.png?branch=master)](http://travis-ci.org/glaubinix/changelog-builder) [![Dependency Status](https://www.versioneye.com/user/projects/53d95f9a11489b8e30000024/badge.svg?style=flat)](https://www.versioneye.com/user/projects/53d95f9a11489b8e30000024)

[![NPM](https://nodei.co/npm/changelog-builder.png?downloads=true&stars=true)](https://nodei.co/npm/changelog-builder/)

## Usage

```
cp config.json.dist config.json
node index.js oldBranch newBreanch
```

## Config examples

There is currently support for 2 different types of commit grouping by epics. The success highly depends on your workflow. If you mark all your comments with certain keywords the config might work better for you. If you add Issue identifiers to all your commits and mark all your issues with an Epic in Jira then the Jira component might work better for you.

#### Config
This will simply parse every commit and if the commit message contains a predefined epic type, the commit will be added to the group. Every commit will only appear in one group.
```
	"epics": {
		"type": "config",
		"types": [
			"Awesome Feature",
			"Epic Feature"
		]
	}

```

#### Jira
The Jira Epic feature will try to find the epic for each commit. First parse the commit with the issue pattern defined in the config, then fetch the epic. If the issue is a subtask, the epic of the parent task will be used.
```
	"epics": {
		"type": "jira",
		"jira": {
			"host": "jira.host.com",
			"port": 443,
			"user": "jira user",
			"password": "jira password"
		}
	}

```

## install

With [npm](https://npmjs.org) do:

```
npm install changelog-builder
```

## license

MIT
