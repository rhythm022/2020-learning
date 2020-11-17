import {IPersonState} from "./State";
import {RecordState} from "./RecordState";

export type stringOrNull = string | null

// 我们不需要修改IPersonState的实现来添加IsActive，而是使用一个交叉类型来处理这种需求
export type PersonRecord = RecordState & IPersonState
