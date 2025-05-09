import { LGraphNode } from '@comfyorg/litegraph'

export class MyAddNode extends LGraphNode {
  // Name to show
  title = 'Sum'

  constructor() {
    super(MyAddNode.title)
    this.addInput('A', 'number')
    this.addInput('B', 'number')
    this.addOutput('A+B', 'number')
    this.properties.precision = 1
  }

  // Function to call when the node is executed
  onExecute() {
    var A =
      this.getInputData(0) !== undefined && this.getInputData(0) !== null ? this.getInputData(0) : 0
    var B =
      this.getInputData(1) !== undefined && this.getInputData(1) !== null ? this.getInputData(1) : 0
    this.setOutputData(0, Number(A) + Number(B))
  }
}
