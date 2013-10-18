from unittest import TestCase
from changelog_builder.commit_processor.commit_ignore import CommitIgnore


class TestCommitIgnore(TestCase):
    def test_process(self):
        config = {
            'ignore_comments': [
                "<<<<"
            ]
        }

        diff = {
            1: '<<<< merge >>>>',
            2: 'commit'
        }

        subject = CommitIgnore(config)
        actual = subject.process(diff)

        expected = {
            2: 'commit'
        }

        self.assertEqual(expected, actual)
