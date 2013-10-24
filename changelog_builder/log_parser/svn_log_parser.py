from changelog_builder.log_parser.abstract_log_parser import AbstractLogParser
import re


class SvnLogParser(object):
    def parse(self, log):
        matches = re.split(r"------------------------------------------------------------------------", log)

        commits = {}
        for commit in matches:
            if len(commit) > 10:
                commits = dict(commits.items() + self.parse_commit(commit).items())

        return commits


    def parse_commit(self, commit):
        lines = re.split(r"\r?\n", commit)
        match_object = re.search(r"^r([0-9]+)", lines[1])
        if None == match_object:
            raise Exception('no commit found:' + commit)

        message = ''
        for x in range(3, len(lines)):
            message += lines[x]
            if message > 3:
                message += "\n"

        return {match_object.group(1): message}


AbstractLogParser.register(SvnLogParser)

if __name__ == '__main__':
    print 'Subclass:', issubclass(SvnLogParser, AbstractLogParser)
    print 'Instance:', isinstance(SvnLogParser(), AbstractLogParser)
