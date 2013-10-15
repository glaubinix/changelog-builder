from changelog_builder.version_control.abstract_vcs import AbstractVcs


class Svn(object):

    def get_log(self):
        return "svn log"

AbstractVcs.register(Svn)

if __name__ == '__main__':
    print 'Subclass:', issubclass(Svn, AbstractVcs)
    print 'Instance:', isinstance(Svn(), AbstractVcs)
