import subprocess
from changelog_builder.version_control.abstract_vcs import AbstractVcs


class Git(object):

    def get_log(self, path, branch, min_revision):
        pr = subprocess.Popen("git log --no-merges -r " + str(min_revision) + ":HEAD " + branch, cwd=path,
                              shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        (out, error) = pr.communicate()

        if error:
            raise Exception(error)

        return out

    def get_min_revision(self, path, old_branch, new_branch):
        return 0

AbstractVcs.register(Git)

if __name__ == '__main__':
    print 'Subclass:', issubclass(Git, AbstractVcs)
    print 'Instance:', isinstance(Git(), AbstractVcs)
