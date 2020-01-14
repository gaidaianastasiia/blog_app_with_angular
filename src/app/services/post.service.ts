import {Injectable} from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})
export class PostService {
    constructor(
        private storage: AngularFireStorage,
        private db: AngularFirestore
    ) {}

    public getPosts() {
        return new Promise<any>((resolve, reject) => {
            this.db.collection('posts').snapshotChanges()
                .subscribe(snapshots => {
                    resolve(snapshots)
                });

        });
    }

    public addNewPost(post, imgFile) {
        return this.createPost(post, imgFile)
            .then(post => {
                this.db.collection('posts').add(post);
            });
    }

    public updatePost(postKey: string, post, imgFile?: File, oldImgName?: string) {
        if (imgFile) {
            return this.createPost(post, imgFile)
                .then(newPost => {
                    this.deleteStorageImg(oldImgName);
                    this.db.collection('posts').doc(postKey).set(newPost);
                });
        } else {
            return this.db.collection('posts').doc(postKey).set(post);
        }
    }

    public delatePost(imgName: string, postKey: string) {
        this.deleteStorageImg(imgName);
        return this.db.collection('posts').doc(postKey).delete();
    }

    private createPost(post, imgFile) {
        const imgStorageName = `postsImage/${new Date().getTime()}_${imgFile.name}`;

        return this.storeImg(imgStorageName, imgFile)
            .then(snapshot => snapshot.ref.getDownloadURL())
            .then((url) => {
                post['imageUrl'] = url;
                post['imageStorageName'] = imgStorageName;
                return post;
            })
    }

    private storeImg(name, file) {
        const ref = this.storage.ref(name);
        return ref.put(file);
    }

    private deleteStorageImg(name) {
        this.storage.ref(name).delete();
    }
}