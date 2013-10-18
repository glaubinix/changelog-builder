import re


class CommitIgnore:
    def __init__(self, config):
        self.config = config

    def process(self, commits):
        if len(self.config['ignore_comments']) == 0:
            return commits

        valid_commits = {}
        for ignore_comment in self.config['ignore_comments']:
            for key in set(commits):
                match = re.search(ignore_comment, commits[key])
                if None == match:
                    valid_commits[key] = commits[key]

        return valid_commits

