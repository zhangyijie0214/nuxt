module.exports = {
    extends: [
        'stylelint-config-standard',
        'stylelint-config-prettier',
        'stylelint-config-recommended-less',
        'stylelint-config-recommended-scss',
        'stylelint-config-standard-vue'

    ],
    plugins: ['stylelint-order'],
    overrides: [
        {
            files: ['**/*.(scss|css|vue|html)'],
            customSyntax: 'postcss-scss'
        },
        {
            files: ['**/*.(less|css|vue|html)'],
            customSyntax: 'postcss-less'
        },
        {
            files: ['**/*.(html|vue)'],
            customSyntax: 'postcss-html'
        }
    ],
    ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.tsx', '**/*.ts', '**/*.json',],
    rules: {
        // 指定缩进（可自动修复）
        indentation: 2,
        // 不允许未知单位
        'unit-no-unknown': [true, { ignoreUnits: ['rpx', 'upx'] }],
        // 不允许未知的伪元素选择器
        'selector-pseudo-element-no-unknown': [true, { ignorePseudoElements: ['v-deep', ':deep'] }],
        // 要求或不允许小于 1 的小数前导零（可自动修复）
        'number-leading-zero': 'always',
        // 不允许较低特异性的选择器出现在覆盖较高特异性的选择器之后
        'no-descending-specificity': null,
        // 要求或禁止 url 的引号
        'function-url-quotes': 'always',
        // 在字符串周围指定单引号或双引号（可自动修复）
        'string-quotes': 'single',
        // 指定单位的小写或大写（可自动修复）
        'unit-case': null,
        // 为十六进制颜色指定小写或大写（可自动修复）
        'color-hex-case': 'lower',
        // 为十六进制颜色指定短或长符号（可自动修复）
        'color-hex-length': 'long',
        // 要求或禁止规则前的空行（可自动修复）
        'rule-empty-line-before': ['always', { except: ['after-single-line-comment'] }],
        // 不允许在字体系列名称列表中缺少通用系列
        'font-family-no-missing-generic-family-keyword': null,
        // 不允许未知类型选择器
        'selector-type-no-unknown': null,
        // 在块的左大括号之前需要一个空格或不允许有空格（可自动修复）
        'block-opening-brace-space-before': 'always',
        // 不允许未知的规则
        'at-rule-no-unknown': null,
        // 禁止样式表中的重复选择器
        'no-duplicate-selectors': null,
        // 不允许未知属性
        'property-no-unknown': null,
        // 不允许空源
        'no-empty-source': null,
        // 指定类选择器的模式
        'selector-class-pattern': null,
        // 指定关键帧名称的模式
        'keyframes-name-pattern': null,
        // 不允许未知的伪类选择器
        'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['global', 'deep'] }],
        'function-no-unknown': null,
        // 使用插件 stylelint-order 定义属性顺序
        'order/properties-order': [
            'position',
            'top',
            'right',
            'bottom',
            'left',
            'z-index',
            'display',
            'justify-content',
            'align-items',
            'float',
            'clear',
            'overflow',
            'overflow-x',
            'overflow-y',
            'margin',
            'margin-top',
            'margin-right',
            'margin-bottom',
            'margin-left',
            'padding',
            'padding-top',
            'padding-right',
            'padding-bottom',
            'padding-left',
            'width',
            'min-width',
            'max-width',
            'height',
            'min-height',
            'max-height',
            'font-size',
            'font-family',
            'font-weight',
            'border',
            'border-style',
            'border-width',
            'border-color',
            'border-top',
            'border-top-style',
            'border-top-width',
            'border-top-color',
            'border-right',
            'border-right-style',
            'border-right-width',
            'border-right-color',
            'border-bottom',
            'border-bottom-style',
            'border-bottom-width',
            'border-bottom-color',
            'border-left',
            'border-left-style',
            'border-left-width',
            'border-left-color',
            'border-radius',
            'text-align',
            'text-justify',
            'text-indent',
            'text-overflow',
            'text-decoration',
            'white-space',
            'color',
            'background',
            'background-position',
            'background-repeat',
            'background-size',
            'background-color',
            'background-clip',
            'opacity',
            'filter',
            'list-style',
            'outline',
            'visibility',
            'box-shadow',
            'text-shadow',
            'resize',
            'transition'
        ]
    }
}