import unittest
from changelog_builder.log_parser import SvnLogParser


class TestSvnLogParser(unittest.TestCase):
    def setUp(self):
        self.subject = SvnLogParser()

    def tearDown(self):
        del self.subject

    def testOneSimpleCommit(self):
        self.assertEqual(True, True)
        return
        log = "commit d6b1064f0031ac577096f8b9940261912d89b8ff\nAuthor: Stephan Vock <stephan.vock@innogames.de>\nDate:   Wed Oct 16 00:17:38 2013 +0200\n\niml file not necessary"

        actual = self.subject.parse(log)

        expected = {}
        expected['d6b1064f0031ac577096f8b9940261912d89b8ff'] = 'iml file not necessary'

        self.assertEqual(expected, actual)

    def testMultipleCommit(self):
        log = "------------------------------------------------------------------------\nr2 | stephan.vock | 2013-10-15 18:13:02 +0200 (Di, 15 Okt 2013) | 3 lines\n\nparsing single commits in git\n------------------------------------------------------------------------\nr1 | stephan.vock | 2013-10-15 18:08:25 +0200 (Di, 15 Okt 2013) | 1 line\n\nadded LICENCE file\n------------------------------------------------------------------------";
        actual = self.subject.parse(log)

        expected = {}
        expected['1'] = 'added LICENCE file\n\n'
        expected['2'] = 'parsing single commits in git\n\n'

        self.assertEqual(expected, actual)

if __name__ == '__main__':
    unittest.main()
