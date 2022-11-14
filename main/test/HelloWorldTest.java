
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;


public class HelloWorldTest {

  @Test
  void testHelloWord() {
    Assertions.assertTrue(HelloWorld.isGreater(4, 3), "Num 1 is greater than Num 2");
  }
}
