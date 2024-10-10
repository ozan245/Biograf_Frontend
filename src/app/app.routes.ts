import { Routes } from '@angular/router';
import { LoginComponent } from './admin/login/login.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';
import { MoviesComponent } from './admin/movies/movies.component';
import { MovieAddComponent } from './admin/movies/movie-add/movie.add.component';
import { MovieUpdateComponent } from './admin/movies/movie-update/movie-update.component';
import { MovieDeleteComponent } from './admin/movies/movie-delete/movie-delete.component';
import { GenreAddComponent } from './admin/genres/genre-add/genre-add.component';
import { GenreUpdateComponent } from './admin/genres/genre-update/genre-update.component';
import { GenreDeleteComponent } from './admin/genres/genre-delete/genre-delete.component';
import { CinemaAddComponent } from './admin/cinemas/cinema-add/cinema-add.component';
import { CinemaUpdateComponent } from './admin/cinemas/cinema-update/cinema-update.component';
import { CinemaDeleteComponent } from './admin/cinemas/cinema-delete/cinema-delete.component';
import { HallAddComponent } from './admin/halls/hall-add/hall-add.component';
import { HallUpdateComponent } from './admin/halls/hall-update/hall-update.component';
import { HallDeleteComponent } from './admin/halls/hall-delete/hall-delete.component';
import { SeatAddComponent } from './admin/seats/seat-add/seat-add.component';
import { SeatUpdateComponent } from './admin/seats/seat-update/seat-update.component';
import { SeatDeleteComponent } from './admin/seats/seat-delete/seat-delete.component';
import { ShowtimeAddComponent } from './admin/showtimes/showtime-add/showtime-add.component';
import { ShowtimeUpdateComponent } from './admin/showtimes/showtime-update/showtime-update.component';
import { ShowtimeDeleteComponent } from './admin/showtimes/showtime-delete/showtime-delete.component';
import { DashAreaComponent } from './admin/dashboard/dasharea';
import { HomeComponent } from './user/home/home.component';
import { ShowtimeComponent } from './user/showtime/showtime.component';
import { SeatComponent } from './user/seat/seat.component';
import { ReservationComponent } from './user/reservation/reservation.component';
import { UserGuard } from './auth/user.guard';
import { UserloginComponent } from './user/userlogin/userlogin.component';
import { AdminGuard } from './auth/admin.guard';
import { TicketComponent } from './user/ticket/ticket.component';
import { UsersignupComponent } from './user/usersignup/usersignup.component';

export const routes: Routes = [
   {path: '', redirectTo: 'home', pathMatch: 'full'},
   {path: 'userlogin', component: UserloginComponent},
   {path: 'usersignup', component: UsersignupComponent},
   {path: 'home', component: HomeComponent},
   { path: 'showtime/:movieId', component: ShowtimeComponent, canActivate:[UserGuard]},
   { path: 'seat/:selectedShowtimeId', component: SeatComponent },
   { path: 'reservation', component: ReservationComponent },
   {path: 'ticket/:paymentId', component: TicketComponent},
   {path: 'admin/login', component: LoginComponent},
   {path: 'admin/dashboard', component: DashboardComponent, canActivate:[AdminGuard],
      children: [
         {path: '', redirectTo: 'dasharea', pathMatch: 'full'},
         {path: 'dasharea', component: DashAreaComponent},
         {path: 'moviesadd', component: MovieAddComponent},
         {path: 'moviesupdate', component: MovieUpdateComponent},
         {path: 'moviesdelete', component: MovieDeleteComponent},
         {path: 'genresadd', component: GenreAddComponent},
         {path: 'genresupdate', component: GenreUpdateComponent},
         {path: 'genresdelete', component: GenreDeleteComponent},
         {path: 'cinemasadd', component: CinemaAddComponent},
         {path: 'cinemasupdate', component: CinemaUpdateComponent},
         {path: 'cinemasdelete', component: CinemaDeleteComponent},
         {path: 'hallsadd', component: HallAddComponent},
         {path: 'hallsupdate', component: HallUpdateComponent},
         {path: 'hallsdelete', component: HallDeleteComponent},
         {path: 'seatsadd', component: SeatAddComponent},
         {path: 'seatsupdate', component: SeatUpdateComponent},
         {path: 'seatsdelete', component: SeatDeleteComponent},
         {path: 'showtimesadd', component: ShowtimeAddComponent},
         {path: 'showtimesupdate', component: ShowtimeUpdateComponent},
         {path: 'showtimesdelete', component: ShowtimeDeleteComponent},
         { path: 'moviesupdate/:title', component: MovieUpdateComponent }

      ]
   }
];
