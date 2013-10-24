class CommitLength:
    def __init__(self, config):
        self.config = config

    def process(self, commits):
        if 'full' == self.config['commit_length']:
            return commits

        short_commits = {}
        for key in commits:
            commit = commits[key]
            lines = commit.split("\n")

            if len(lines[0]) > 2:
                short_commits[key] = lines[0]
            else:
                short_commits[key] = lines[1]

        return short_commits

