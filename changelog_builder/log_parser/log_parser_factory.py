from changelog_builder.log_parser.git_log_parser import GitLogParser


class LogParserFactory:
    def __init__(self):
        pass

    def get_parser(self, identifier):
        if 'git' == identifier:
            return GitLogParser()
        elif 'svn' == identifier:
            return Svn()


