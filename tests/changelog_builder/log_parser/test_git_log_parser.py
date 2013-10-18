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

    def testMultipleCommit(self):
        log = "commit 540194de5436675a6bfc71f0b1e033f2f32d0be8\nAuthor: Stephan Vock <stephan.vock@innogames.de>\nDate:   Wed Oct 16 01:03:17 2013 +0200\n\nparsing single commits in git\n\ncommit d6b1064f0031ac577096f8b9940261912d89b8ff\nAuthor: Stephan Vock <stephan.vock@innogames.de>\nDate:   Wed Oct 16 00:17:38 2013 +0200\n\niml file not necessary\n\ncommit 25bf459c9248ec5fb7d3c8638fcc4ea76f4e19ad\nAuthor: Stephan Vock <stephan.vock@innogames.de>\Date:   Wed Oct 16 00:15:58 2013 +0200\n\nadded LICENCE file";
        actual = self.subject.parse(log)

        expected = {}
        expected['540194de5436675a6bfc71f0b1e033f2f32d0be8'] = 'parsing single commits in git'
        expected['d6b1064f0031ac577096f8b9940261912d89b8ff'] = 'iml file not necessary'
        expected['25bf459c9248ec5fb7d3c8638fcc4ea76f4e19ad'] = 'added LICENCE file'

        self.assertEqual(expected, actual)

if __name__ == '__main__':
    unittest.main()
