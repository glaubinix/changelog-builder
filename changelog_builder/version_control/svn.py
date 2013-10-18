import os
import subprocess
from changelog_builder.version_control.abstract_vcs import AbstractVcs


class Svn(object):

    def get_log(self, path, branch):
        pr = subprocess.Popen("svn log " + path + branch, cwd=os.path.dirname(os.path.realpath(__file__)),
                              shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        (out, error) = pr.communicate()

        if error:
            raise Exception(error)

        return out

AbstractVcs.register(Svn)

if __name__ == '__main__':
    print 'Subclass:', issubclass(Svn, AbstractVcs)
    print 'Instance:', isinstance(Svn(), AbstractVcs)
