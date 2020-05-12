import { Injectable } from '@angular/core';
import { News } from '../../../shared/model/news';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize, map } from 'rxjs/operators';
interface Filenews {
  name: string;
  imageFile: File;
  size: string;
  type: string;
}

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private newsCollection: AngularFirestoreCollection<News>;
  private filePath: any;
  private downloadURL: Observable<string>;

  constructor(private afs: AngularFirestore,
    private storage: AngularFireStorage,
    private db: AngularFirestore,) { 
    this.newsCollection = afs.collection<News>('news');
  }

  public getAllNews(): Observable<News[]> {
    return this.newsCollection
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as News;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }



  preAddAndUpdateNews(news: News, image: Filenews): void {
    this.uploadImage(news, image);
    console.log(news);
    console.log(image);
  }

  saveNews(news: News) {
    const newsObj = {
      title : news.title,
      price : news.price,
      description : news.description,
      newsPhoto: this.downloadURL,
      fileRef: this.filePath,

    };
    console.log(newsObj)
    if (news.id) {
      console.log(newsObj)
      console.log(news.id)
      return this.newsCollection.doc(news.id).update(newsObj);
    } else {
      console.log(newsObj)
      return this.newsCollection.add(newsObj);
    }
  }

  uploadImage(news: News, image: Filenews) {
    this.filePath = `news-uploads/${image.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    task.snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(urlImage => {
            this.downloadURL = urlImage;
            this.saveNews(news);
            console.log(news)
            console.log(this.downloadURL);
          });
        })
      ).subscribe();
  }

  public deleteNewsById(news: News) {
    return this.newsCollection.doc(news.id).delete();
  }

  public editNewsById(news: News, newImage?: Filenews) {
    if (newImage) {
      this.uploadImage(news, newImage);
    } else {
      return this.newsCollection.doc(news.id).update(news);
    }
  }
  deleteAppointment(newsId: string){
    this.db.doc('news/' + newsId).delete();
}

  getNews() {
    return this.db.collection('news').snapshotChanges();
  }


}
