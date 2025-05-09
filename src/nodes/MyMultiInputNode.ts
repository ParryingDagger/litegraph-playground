import { LGraphNode } from '@comfyorg/litegraph'

export class MyMultiInputNode extends LGraphNode {
  title = 'MultiInput'
  textValue = '0'
  selectedOption = '1'

  constructor() {
    super(MyMultiInputNode.title)

    this.size = [300, 200]
    this.addOutput('输出', 'number')

    // 添加文本输入框
    let that = this
    this.addWidget('text', '输入数字', this.textValue, function (v) {
      that.textValue = v
    })

    // 添加下拉菜单
    this.addWidget(
      'combo',
      '倍率',
      this.selectedOption,
      function (v) {
        that.selectedOption = v
      },
      {
        values: ['1', '2', '4', '8'],
      },
    )

    // 添加按钮
    this.addWidget('button', '执行', '', function () {
      that.onButtonClick()
    })

    // 初始化属性
    this.properties = {
      textValue: '',
      selectedOption: '1',
    }
  }

  // 按钮点击处理
  onButtonClick() {
    console.log('按钮被点击')
    console.log('文本值:', this.properties.textValue)
    console.log('选中选项:', this.properties.selectedOption)

    // 处理数据并输出
    const output = this.processData()
    this.setOutputData(0, output)
  }

  // 数据处理
  processData() {
    return parseFloat(this.textValue) * parseFloat(this.selectedOption)
  }
}
