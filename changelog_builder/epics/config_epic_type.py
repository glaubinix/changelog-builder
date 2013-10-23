from changelog_builder.epics.abstract_epic_type import AbstractEpicType


class ConfigEpicType(object):

    def parse(self, config, commits):
        grouped_commits = {'default': []}

        for epic in config['epics']:
            grouped_commits[epic] = []

        for key in commits:
            found = False

            for epic in config['epics']:
                if epic in commits[key]:
                    grouped_commits[epic].append(commits[key])
                    found = True
                    break

            if not found:
                grouped_commits['default'].append(commits[key])

        return grouped_commits

AbstractEpicType.register(ConfigEpicType)

if __name__ == '__main__':
    print 'Subclass:', issubclass(ConfigEpicType, AbstractEpicType)
    print 'Instance:', isinstance(ConfigEpicType(), AbstractEpicType)
