# react-micro-frontends

Repository that contains example of microfrontend (MFE) app that presents how module federation works.

React was the framework of choice for this.

# Notes

## [YouTube tutorial](https://www.youtube.com/watch?v=t-nchkL9yIg)

Skipped part for "build tweaks" at 9:10 (for shared-components/remote app) and 12:32 (home/host app).

## [Architect's guide to micro-frontends](https://developersvoice.com/blog/frontend/micro-frontends-with-react-and-angular/?utm_source=bonobopress&utm_medium=newsletter&utm_campaign=2093)

Very good article about module federation and micro frontends - two separate microfrontends built in Angular and React.

# Deployments Considerations

Deployment pipeline runs check what files has been changed. Since each app is kept in separate folder, check 
runs only relevant "path" of the pipeline (each MFE has it's own pipeline "path"), meaning it deploys MFEs seperately, independently.

Each MFE can be easily moved to its own repository by just dropping respective directory contents and cloning
part of pipeline corresponding to respctive "path" in pipeline.