module.exports = {
    pkgRoot: 'lib',
    plugins: [
        [
            '@semantic-release/commit-analyzer',
            {
                preset: 'angular',
                releaseRules: [
                    {
                        release: 'major',
                        type: 'breaking',
                    },
                    {
                        release: 'patch',
                        type: 'chore',
                    },
                    {
                        release: 'patch',
                        type: 'refactor',
                    },
                    {
                        release: 'patch',
                        type: 'revert',
                    },
                ],
            },
        ],
        '@semantic-release/npm',
        [
            '@semantic-release/git',
            {
                assets: ['package.json'],
                message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
            },
        ],
    ],
};
