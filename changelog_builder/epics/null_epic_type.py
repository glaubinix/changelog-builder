from changelog_builder.epics.abstract_epic_type import AbstractEpicType


class NullEpicType(object):
    def parse(self, config, commits):
        grouped_commits = {'default': []}
        for key in commits:
            grouped_commits['default'].append(commits[key])

        return grouped_commits

AbstractEpicType.register(NullEpicType)

if __name__ == '__main__':
    print 'Subclass:', issubclass(NullEpicType, AbstractEpicType)
    print 'Instance:', isinstance(NullEpicType(), AbstractEpicType)
