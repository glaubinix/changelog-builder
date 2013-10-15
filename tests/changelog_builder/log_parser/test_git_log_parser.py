import unittest
from changelog_builder.log_parser import GitLogParser


class TestGitLogParser(unittest.TestCase):
    def setUp(self):
        self.subject = GitLogParser()

    def tearDown(self):
        del self.subject

    def testOneSimpleCommit(self):
        log = "commit d6b1064f0031ac577096f8b9940261912d89b8ff\nAuthor: Stephan Vock <stephan.vock@innogames.de>\nDate:   Wed Oct 16 00:17:38 2013 +0200\n\niml file not necessary"

        actual = self.subject.parse(log)

        expected = {}
        expected['d6b1064f0031ac577096f8b9940261912d89b8ff'] = 'iml file not necessary'

        self.assertEqual(expected, actual)

if __name__ == '__main__':
    unittest.main()
