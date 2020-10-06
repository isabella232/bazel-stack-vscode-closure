import { ProblemMatcherTest, ProblemMatcherTestRunner } from 'bazel-stack-vscode-api/out/test/problemMatcherTestRunner';
import * as path from 'path';
import * as vscode from 'vscode';
import { markers } from 'vscode-common';

suite('Problem Matchers', () => {
	let runner: ProblemMatcherTestRunner;

	setup(() => {
		runner = ProblemMatcherTestRunner.fromPackageJson(path.join(__dirname, '..', '..', '..', 'package.json'));
	});

	const cases: ProblemMatcherTest[] = [
		{
			name: 'Closure',
			example: 'js/lib/foo.js:1195: ERROR - inconsistent return type',
			uri: 'file:///%24%7BworkspaceRoot%7D/js/lib/foo.js',
			markers: [{
				message: 'inconsistent return type',
				owner: 'Closure',
				resource: vscode.Uri.file('js/lib/foo.js'),
				severity: markers.MarkerSeverity.Error,
				startLineNumber: 1195,
				startColumn: 1,
				endLineNumber: 1195,
				endColumn: 2147483647,
			}],
		}
	];

	cases.forEach((tc) => {
		test(tc.d || tc.name, async () => runner.test(tc));
	});

});
