import React from 'react'
interface IProps {
    history: {
        block: (prompt: string) => void
        push: (target: string) => void
    }
}
const Teacher: React.FC<IProps> = ({ history }) => {
    return (
        <div>
            老师
            <button onClick={() => {
                history.push('/student')
            }}>to student</button>
        </div>
    )
}
export default Teacher
