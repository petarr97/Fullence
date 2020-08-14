import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { JobType } from './jobType.model';

@Injectable({ providedIn: 'root' })

export class JobTypeService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  private jobTypes: JobType[] = [];
  private jobsUpdated = new Subject<JobType[]>();

  getJobTypes() {
    this.http
      .get<{ message: string; job_type: any }>(
        'http://localhost:3000/api/jobType'
      )
      .pipe(
        map((jobTypeData) => {
          // _id to id
          return jobTypeData.job_type.map((job) => {
            return {
              id: job._id,
              jobType: job.job_type,
            };
          });
        })
      )
      .subscribe((transfJobs) => {
        this.jobTypes = transfJobs;
        this.jobsUpdated.next([...this.jobTypes]);
      });
  }

  getJobUpdateListener() {
    return this.jobsUpdated.asObservable();
  }
}
