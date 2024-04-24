import firebase from "firebase/compat/app"; // Подключаем основной модуль Firebase

// Добавляем необходимые продукты Firebase
import "firebase/compat/auth";
import "firebase/compat/firestore";

// Класс для работы с аутентификацией Firebase
class FirebaseAuthBackend {
  constructor(firebaseConfig) {
    if (firebaseConfig) {
      // Инициализируем Firebase с переданными конфигурационными данными
      firebase.initializeApp(firebaseConfig);

      // Устанавливаем слушатель изменений аутентификации пользователя
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // Если пользователь аутентифицирован, сохраняем его данные в локальное хранилище
          localStorage.setItem("authUser", JSON.stringify(user));
        } else {
          // Если пользователь не аутентифицирован, удаляем его данные из локального хранилища
          localStorage.removeItem("authUser");
        }
      });
    }
  }

  /**
   * Регистрирует нового пользователя с заданными данными
   */
  registerUser = (email, password) => {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(
          (user) => {
            resolve(firebase.auth().currentUser);
          },
          (error) => {
            reject(this._handleError(error));
          }
        );
    });
  };

  /**
   * Редактирует профиль пользователя
   */
  editProfileAPI = (email, password) => {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(
          (user) => {
            resolve(firebase.auth().currentUser);
          },
          (error) => {
            reject(this._handleError(error));
          }
        );
    });
  };

  /**
   * Аутентифицирует пользователя с заданными данными
   */
  loginUser = (email, password) => {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(
          (user) => {
            resolve(firebase.auth().currentUser);
          },
          (error) => {
            reject(this._handleError(error));
          }
        );
    });
  };

  /**
   * Отправляет ссылку для сброса пароля на заданный адрес электронной почты
   */
  forgetPassword = (email) => {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .sendPasswordResetEmail(email, {
          url:
            window.location.protocol + "//" + window.location.host + "/login",
        })
        .then(() => {
          resolve(true);
        })
        .catch((error) => {
          reject(this._handleError(error));
        });
    });
  };

  /**
   * Выходит из системы текущего пользователя
   */
  logout = () => {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signOut()
        .then(() => {
          resolve(true);
        })
        .catch((error) => {
          reject(this._handleError(error));
        });
    });
  };

  /**
   * Аутентифицирует пользователя через сторонний провайдер
   */
  socialLoginUser = (data, type) => {
    let credential = {};
    if (type === "google") {
      credential = firebase.auth.GoogleAuthProvider.credential(
        data.idToken,
        data.token
      );
    } else if (type === "facebook") {
      credential = firebase.auth.FacebookAuthProvider.credential(data.token);
    }
    return new Promise((resolve, reject) => {
      if (!!credential) {
        firebase
          .auth()
          .signInWithCredential(credential)
          .then((user) => {
            resolve(this.addNewUserToFirestore(user));
          })
          .catch((error) => {
            reject(this._handleError(error));
          });
      } else {
        // reject(this._handleError(error));
      }
    });
  };

  // Добавляет информацию о новом пользователе в Firestore
  addNewUserToFirestore = (user) => {
    const collection = firebase.firestore().collection("users");
    const { profile } = user.additionalUserInfo;
    const details = {
      firstName: profile.given_name ? profile.given_name : profile.first_name,
      lastName: profile.family_name ? profile.family_name : profile.last_name,
      fullName: profile.name,
      email: profile.email,
      picture: profile.picture,
      createdDtm: firebase.firestore.FieldValue.serverTimestamp(),
      lastLoginTime: firebase.firestore.FieldValue.serverTimestamp(),
    };
    collection.doc(firebase.auth().currentUser.uid).set(details);
    return { user, details };
  };

  // Устанавливает информацию об аутентифицированном пользователе в локальное хранилище
  setLoggeedInUser = (user) => {
    localStorage.setItem("authUser", JSON.stringify(user));
  };

  /**
   * Возвращает аутентифицированного пользователя
   */
  getAuthenticatedUser = () => {
    if (!localStorage.getItem("authUser")) return null;
    return JSON.parse(localStorage.getItem("authUser"));
  };

  /**
   * Обрабатывает ошибки Firebase
   * @param {*} error
   */
  _handleError(error) {
    // var errorCode = error.code;
    var errorMessage = error.message;
    return errorMessage;
  }
}

let _fireBaseBackend = null;

/**
 * Инициализирует бэкенд Firebase
 * @param {*} config
 */
const initFirebaseBackend = (config) => {
  if (!_fireBaseBackend) {
    _fireBaseBackend = new FirebaseAuthBackend(config);
  }
  return _fireBaseBackend;
};

/**
 * Возвращает бэкенд Firebase
 */
const getFirebaseBackend = () => {
  return _fireBaseBackend;
};

export { initFirebaseBackend, getFirebaseBackend };
