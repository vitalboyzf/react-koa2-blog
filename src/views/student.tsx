import React from 'react'
import { connect } from 'dva'
interface IProps {
    onIncrease(newCount: number): void
    count: number
    history: {
        block: (prompt: string) => void
        push: (target: string) => void
    }

}
const Student: React.FC<IProps> = (props) => {
    props.history.block("是否跳转页面？")
    return (
        <div>
            {props.count}
            <button onClick={() => props.onIncrease(12)}>点击</button>
            <button onClick={() => {
                props.history.push('/teacher')
            }}>to Teacher</button>
        </div>
    )
}
const mapStateToProps = (state: any) => {
    console.log(state)
    return {
        count: state.student
    }
}
const mapDispatchToProps = (dispatch: any) => {
    return {
        onIncrease(payload: number) {
            dispatch({ type: "student/add", payload })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Student)

