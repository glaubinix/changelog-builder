from changelog_builder.log_parser.abstract_log_parser import AbstractLogParser
import re


class GitLogParser(object):

    def parse(self, log):
        return self.parse_commit(log)

    def parse_commit(self, commit):
        match_object = re.search(r"commit\s(.{40})", commit)
        if None == match_object:
            raise Exception('no commit found')

        match_message = re.split(r"\r?\n\s*\r?\n", commit, 1)
        if None == match_message[1]:
            raise Exception('no commit message found')

        return {match_object.group(1): match_message[1]}

AbstractLogParser.register(GitLogParser)

if __name__ == '__main__':
    print 'Subclass:', issubclass(GitLogParser, AbstractLogParser)
    print 'Instance:', isinstance(GitLogParser(), AbstractLogParser)
