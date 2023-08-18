module.exports = {
    env: {
        'vue/setup-compiler-macros': true
    },
    extends: [
        'plugin:vue/vue3-recommended',
    ],
    parser: 'vue-eslint-parser',
    plugins: ['vue'],
    rules: {
        'vue/multi-word-component-names': 0,
        'vue/require-default-prop': 0, // 关闭属性参数必须默认值
        'vue/singleline-html-element-content-newline': 0, // 关闭单行元素必须换行符
        'vue/multiline-html-element-content-newline': 0, // 关闭多行元素必须换行符
        // 要求每一行标签的最大属性不超五个
        'vue/max-attributes-per-line': ['warn', { singleline: 5 }],
        // 要求html标签的缩进为需要4个空格
        'vue/html-indent': [
            'warn',
            4,
            {
                attribute: 1,
                baseIndent: 1,
                closeBracket: 0,
                alignAttributesVertically: true,
                ignores: []
            }
        ],
        // 取消关闭标签不能自闭合的限制设置
        'vue/html-self-closing': [
            'error',
            {
                html: {
                    void: 'always',
                    normal: 'never',
                    component: 'always'
                },
                svg: 'always',
                math: 'always'
            }
        ]
    }
}