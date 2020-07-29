import React, { useEffect, useState } from "react"
import { SettingsRequest } from "@oryd/kratos-client"
import { initialiseRequest } from "services/kratos"
import { Header } from "components/Header"
import { KratosMessages } from "components/KratosMessages"
import { KratosForm } from "components/KratosForm"

export const Settings = () => {
  const [requestResponse, setRequestResponse] = useState<SettingsRequest>()

  useEffect(() => {
    const request = initialiseRequest({ type: "settings" }) as Promise<SettingsRequest>
    request
      .then(request => setRequestResponse(request))
      .catch(() => {})
  }, [setRequestResponse])

  const formPassword = requestResponse?.methods?.password?.config
  const formProfile = requestResponse?.methods?.profile?.config
  const messages = requestResponse?.messages

  return (
    <div className="content">
      <Header />
      <div className="container">
        <h2>Settings</h2>
        { messages && <KratosMessages messages={ messages } /> }
        <div id="user-password">
          <h3>Profile</h3>
          { formProfile &&
            <KratosForm
              action={ formProfile.action }
              fields={ formProfile.fields }
              messages={ formProfile.messages } /> }
        </div>
        <div id="user-password">
          <h3>Password</h3>
          { formPassword &&
          <KratosForm
            action={ formPassword.action }
            fields={ formPassword.fields }
            messages={ formPassword.messages } /> }
        </div>
      </div>
    </div>
  )
}
