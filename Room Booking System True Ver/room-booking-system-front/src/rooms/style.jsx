
export const style = { 
    card : { 
        border: "2px solid", 
        display: "grid", 
        gridTemplateColumns: "1fr 1fr", 
        gridAutoFlow: "row", 
        padding: "10px 10px 15px 10px" 
    }, 
    nameInput: { 
        fontSize: "1.5em", 
        fontWeight: "bold" 
    }, 
    flushButton:{ 
        width: "75%", 
        height: "10%", 
        marginTop: "auto" 
    }, 
    button: { 
        width: "75%", 
        height: "10%" 
    }, 
    linkButton: {
        width: "75%",
        height: "auto",
        border: "1px solid black",
        textAlign: "center",
        backgroundColor: "#d6d6d6",
        textDecoration: 'none',
        color: 'inherit'

    },
    image: { 
        height: "auto", 
        width: "75%" 
    }, 
    leftColumn:{ 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "flex-start", 
        justifyContent: "space-between" 
    }, 
    rightColumn:{ 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "flex-end", 
        justifyContent: "flex-end" 
    } 
}