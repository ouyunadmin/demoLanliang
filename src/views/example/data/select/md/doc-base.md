1. `v-model`的值为当前被选中的`el-option`的 `value` 属性值。
2. 在`el-option`中，设定`disabled`值为 `true`，即可禁用该选项。
3. 为`el-select`设置`disabled`属性，则整个选择器不可用。
4. 为`el-select`设置`clearable`属性，则可将选择器清空。需要注意的是，`clearable`属性仅适用于单选。
5. 自定义模板将自定义的 `HTML` 模板插入`el-option`的 `slot` 中即可。