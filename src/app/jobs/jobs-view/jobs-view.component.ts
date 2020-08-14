import { Component, OnInit, OnDestroy } from '@angular/core';
import { JobsService } from 'src/app/jobs/job.service';
import { Job } from 'src/app/jobs/job.model';
import { Subscription } from 'rxjs';
import { LocationService } from 'src/app/location/location.service';
import { Location } from 'src/app/location/location.model';
import { JobType } from 'src/app/jobs/job-Type/jobType.model';
import { JobTypeService } from 'src/app/jobs/job-Type/jobType.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-jobs-view',
  templateUrl: './jobs-view.component.html',
  styleUrls: ['./jobs-view.component.css'],
})
export class JobsViewComponent implements OnInit, OnDestroy {
  jobs: Job[] = [];
  locations: Location[] = [];
  jobTypes: JobType[] = [];

  private postsSub: Subscription;
  private locationsSub: Subscription;
  private jobTypSub: Subscription;

  public filterLocation = '';
  public filterJobType = '';
  search = '';

  constructor(
    private jobsService: JobsService,
    private locationService: LocationService,
    private jobTypeService: JobTypeService,
    private authService: AuthService
  ) {}

  totalPosts = 0;
  postsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  userIsAuthenticated = false;
  userId: string;
  private authStatusSub: Subscription;
  myJobs: boolean;


  ngOnInit(): void {
    //kreiranje svih poslova
    this.jobsService.getJobs();
    this.userId = this.authService.getUserId();
    this.myJobs = false;
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.postsSub = this.jobsService
      .getPostUpdateListener()
      .subscribe((jobs: Job[]) => {
        this.jobs = jobs;

        this.jobs.forEach((job) => {
          if (job.description.length > 150) {
            job.descSubstring = job.description.substring(0, 150) + '...';
          } else job.descSubstring = job.description;
        });
      });
    //kreiranje svih lokacija
    this.locationService.getLocations();
    this.locationsSub = this.locationService
      .getLocationsUpdatedListener()
      .subscribe((locs: Location[]) => {
        this.locations = locs;
      });

    //kreiranje svih jobTypes

    this.jobTypeService.getJobTypes();
    this.jobTypSub = this.jobTypeService
      .getJobUpdateListener()
      .subscribe((jobTypes: JobType[]) => {
        this.jobTypes = jobTypes;
      });
  }

  setJobFilter(job) {
    this.filterJobType = job;
  }


  setLocFilter(loc) {
    this.filterLocation = loc;
  }

  resetLocation() {
    this.filterLocation = '';
  }
  resetJobType() {
    this.filterJobType = '';

    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
  }
  onDelete(jobId: string) {
    this.jobsService.deleteJob(jobId);
  }

  onMyJobs() {
    this.myJobs = !this.myJobs;
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
