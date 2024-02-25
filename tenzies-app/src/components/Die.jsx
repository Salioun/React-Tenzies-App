

export default function Die(props) {

    const style = {
        backgroundColor: props.isHeld ? "#59E391" : "#FFF"
    }

    return (
        <div style={style} className="die" onClick={() => props.holdDice(props.id)}>
            <span className="die-value">{props.value}</span>
        </div>
    )
}
