import re


class UniqueIssues:
    def __init__(self, config):
        self.config = config

    def process(self, commits):
        issues = {}
        valid_commits = {}

        pattern = self.config['issue_format']
        for key in set(commits):
            match = re.search(pattern, commits[key])
            if None == match:
                valid_commits[key] = commits[key]
            else:
                issues[match.group(0)] = key

        for key in issues:
            revision = issues[key]
            valid_commits[revision] = commits[revision]

        return valid_commits

