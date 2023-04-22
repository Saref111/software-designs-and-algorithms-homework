class JobRunner {
    private jobs: Job[] = [];
    private isRunning = false;
    
    constructor() {
        for (let i = 0; i < 10000; i++) {
            this.jobs.push(new Job());
        }
    }

    sortJobsByPriority() {}
    
    run() {
        this.jobs.forEach(job => {
            job.run();
        });
    }
}


class Job {
    priority: number;
    constructor() {
        this.priority = Math.random();
    }
    
    run() {
        console.log('Running job with priority', this.priority);
        
    }
}
