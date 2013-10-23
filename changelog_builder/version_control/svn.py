from collections import OrderedDict
import os
import subprocess
from changelog_builder.version_control.abstract_vcs import AbstractVcs


class Svn(object):

    def get_log(self, path, branch, min_revision):
        pr = subprocess.Popen("svn log -g -r " + str(min_revision) + ":HEAD " + path + branch, cwd=os.path.dirname(os.path.realpath(__file__)),
                              shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        (out, error) = pr.communicate()

        if error:
            raise Exception(error)

        return out

    def get_min_revision(self, path, old_branch, new_branch):
        old_revisions = self.get_revisions_for_branch(path, old_branch)
        new_revisions = self.get_revisions_for_branch(path, new_branch)

        revision_diff = list(set(new_revisions) - set(old_revisions))

        return min(revision_diff) - 1

    def get_revisions_for_branch(self, path, branch):
        pr = subprocess.Popen("svn propget svn:mergeinfo " + path + branch, cwd=os.path.dirname(os.path.realpath(__file__)),
                              shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        (out, error) = pr.communicate()

        if error:
            raise Exception(error)

        revisions = []
        branch_infos = out.split("\n")
        for branch_info in branch_infos:
            if len(branch_info) == 0:
                continue;

            branch_data = branch_info.split(":")
            revision_data = branch_data[1].split(",")
            for revision_string in revision_data:
                if not "-" in revision_string:
                    revisions.append(int(revision_string))
                else:
                    lower_end_revision = revision_string.split("-")
                    for x in range(int(lower_end_revision[0]), int(lower_end_revision[1]) + 1):
                        revisions.append(x)

        return list(OrderedDict.fromkeys(revisions))

AbstractVcs.register(Svn)

if __name__ == '__main__':
    print 'Subclass:', issubclass(Svn, AbstractVcs)
    print 'Instance:', isinstance(Svn(), AbstractVcs)
