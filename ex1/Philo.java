public class Philo {
    public static void main(String[] args) {
        System.out.println("Philo");
        new Philo().exec();
        System.out.println("Philo done");
    }

    private void exec() {
        Runnable[] phds = {createRunnable("phd-1"),
        createRunnable("phd-2"),
        createRunnable("phd-3"),
        createRunnable("phd-4"),
        createRunnable("phd-5")};

        for(Runnable r: phds) {
            Thread t = new Thread(r);
            t.start();
        }

    }

    private Runnable createRunnable(String name) {
        Runnable r = () -> {
            Thread.currentThread().setName(name);
            System.out.println("--> Started Thread: " + Thread.currentThread().getName());
            
            try {
                Thread.sleep(2000);
            } catch (InterruptedException e) {
                throw new IllegalStateException(e);
            }
            System.out.println("--> Ended Thread: " + Thread.currentThread().getName());
        };   
        return r;    
    }
}