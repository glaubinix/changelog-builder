from changelog_builder.version_control.git import Git
from changelog_builder.version_control.svn import Svn


class VersionControlFactory():
    def __init__(self):
        pass

    def get_vcs(self, identifier):
        if 'git' == identifier:
            return Git()
        elif 'svn' == identifier:
            return Svn()

