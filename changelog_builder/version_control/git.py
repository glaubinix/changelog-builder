import subprocess
from changelog_builder.version_control.abstract_vcs import AbstractVcs


class Git(object):

    def get_log(self, path, branch):
        pr = subprocess.Popen("git log --no-merges " + branch, cwd=path,
                              shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        (out, error) = pr.communicate()

        if error:
            raise Exception(error)

        return out

AbstractVcs.register(Git)

if __name__ == '__main__':
    print 'Subclass:', issubclass(Git, AbstractVcs)
    print 'Instance:', isinstance(Git(), AbstractVcs)
