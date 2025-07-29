@allowed(['prod', 'nonprod'])
param environmentType string = 'prod'
@allowed(['shared-components', 'home-app', 'news-feed'])
param microFrontendService string
@secure()
param dockerImageFullUrl string

module webApp 'webAppWithPlan.bicep' = {
  name: 'deploy-web-application-with-service-plan'
  params: {
    environmentType: environmentType
    dockerImageFullUrl: dockerImageFullUrl
    microFrontendService: microFrontendService
  }
}

output webAppName string = webApp.outputs.webAppName
