const PRIORITY = 100;
const MAX_JOBS = 10000;

class JobRunner {
    private jobs: Job[] = [];
    private priorityMap: Map<number, Job[]> = new Map();
    
    constructor() {
        for (let i = 0; i < MAX_JOBS; i++) {
            this.jobs.push(new Job());
        }
    }

    sortJobsByPriority() {
        this.jobs.forEach((job) => {
            if (this.priorityMap.has(job.priority)) {
                this.priorityMap.get(job.priority)!.push(job);
            } else {
                this.priorityMap.set(job.priority, [job]);
            }
        });
    }

    sortMapByPriority() {
        const sortedMap = new Map([...this.priorityMap.entries()].sort((a, b) => b[0] - a[0]));
        this.priorityMap = sortedMap;
    }
    
    run() {
        console.time();
        this.sortJobsByPriority();
        this.sortMapByPriority();
        this.priorityMap.forEach((jobs, priority) => {
            jobs.forEach((job) => {
                job.run();
            });
        });
        console.timeEnd();
    }
}


class Job {
    priority: number;
    constructor() {
        this.priority = Math.floor(Math.random() * PRIORITY);
    }
    
    run() {
        console.log('Running job with priority', this.priority);
        const result = Math.random() * 10;    
        return result;    
    }
}


const jobRunner = new JobRunner();
jobRunner.run();
