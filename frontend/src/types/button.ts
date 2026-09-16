import React from "react"

export default interface IButton {
    type: "login" | "logout"
    children: React.ReactNode
    onClick: () => void
}